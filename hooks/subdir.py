import re
import urlparse

find_href = re.compile(r'\bhref\s*=\s*("[^"]*"|\'[^\']*\'|[^"\'<>=\s]+)')
find_src = re.compile(r'\bsrc\s*=\s*("[^"]*"|\'[^\']*\'|[^"\'<>=\s]+)')

PATTERNS = [find_href, find_src]


def fix_urls(document, base_url, pattern):
    ret = []
    last_end = 0
    for match in pattern.finditer(document):
        url = match.group(1)
        print "Checking url: %s" % url
        if url[0] in "\"'":
            url = url.strip(url[0])
        parsed = urlparse.urlparse(url)
        if parsed.scheme == parsed.netloc == '':
            print "Processing url: %s" % url
            url = '/%s%s' % (base_url, url)
            print "Processed url: %s" % url
            ret.append(document[last_end:match.start(1)])
            ret.append('"%s"' % (url,))
            last_end = match.end(1)
    ret.append(document[last_end:])
    return ''.join(ret)


def add_subdir_hook(subdir):
    def replace_hook(page):
        for pattern in PATTERNS:
            page.rendered = fix_urls(page.rendered, subdir, pattern)
    return [replace_hook]