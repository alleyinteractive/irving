ag -o --no-numbers --no-filename "(#\s\[$1[.\d\-]+((alpha|beta|rc)[.\d]+)?\]\([^)]*\)\s\([0-9\-]+\))(?![\r\n]+\*\*Note:\*\*)[\s\S]+?(?=\n#\s)" CHANGELOG.md |
sed '/^$/d' |
sed 's/### /#### /' |
sed 's/# \[/### \[/'