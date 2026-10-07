"""Read-only checks for deployment inputs, local links and streaming video format."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import struct

root = Path(__file__).resolve().parents[1] / 'dist'

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.duplicates = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        identifier = values.get('id')
        if identifier:
            if identifier in self.ids:
                self.duplicates.append(identifier)
            self.ids.add(identifier)
        for key in ['href', 'src', 'poster']:
            if key in values:
                self.refs.append(values[key])

page = Page()
page.feed((root / 'index.html').read_text(encoding='utf-8-sig'))
missing = []
for ref in page.refs:
    if ref.startswith('#'):
        if ref[1:] not in page.ids:
            missing.append(ref)
    elif not urlsplit(ref).scheme and not (root / ref).is_file():
        missing.append(ref)
assert not missing, f'Missing local references: {missing}'
assert not page.duplicates, f'Duplicate IDs: {page.duplicates}'
print(f'PASS: {len(page.refs)} local/external references scanned; no broken local files or anchors.')

video = (root / 'assets/dex-introduction.mp4').read_bytes()
assert b'avc1' in video and b'mp4a' in video, 'Expected H.264 video and AAC audio'
assert 0 < video.find(b'moov') < video.find(b'mdat'), 'Video metadata must precede media for progressive streaming'
index = video.find(b'mvhd')
version = video[index + 4]
base = index + (24 if version else 16)
scale = struct.unpack('>I', video[base:base + 4])[0]
duration = struct.unpack('>Q' if version else '>I', video[base + 4:base + (12 if version else 8)])[0] / scale
assert abs(duration - 124.436) < 0.15, f'Unexpected video duration: {duration}'
print(f'PASS: H.264/AAC, fast-start metadata, full video duration {duration:.3f}s, {len(video)/1024/1024:.2f} MiB.')
print('NOTE: These checks do not verify visual layout, browser playback, authentication or deployment.')
