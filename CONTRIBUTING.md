## How To Contribute

1. Fork the repository in GitHub with the `Fork` button.
2. Clone the forked repository.
3. Add the original repository as an `upstream` remote:

    git remote add upstream https://github.com/stachern/bseu_fm.git

4. Make sure to create a new feature branch from `master` that is up-to-date.
5. Always create your feature branch: `git checkout -b my-new-feature`.
6. Commit your changes: `git commit -am 'Add some feature'`.
7. Push to the branch: `git push origin my-new-feature`.
8. One commit per Pull Request. Squash commits if needed:
http://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits.
9. Rebase the branch on top of `master` in case new commits were added:
`git rebase upstream/master`.
10. Create a new Pull Request.
