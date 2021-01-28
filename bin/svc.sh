ag -o --no-numbers --no-filename '(#\s\[5\.4[.\d\-]+((alpha|beta|rc)[.\d]+)?\])[\s\S]+?(?=\n#\s)' CHANGELOG.md |
sed '/^$/d' |
sed 's/### /#### /' |
sed 's/# \[/### \[/'