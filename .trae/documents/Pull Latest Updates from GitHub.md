## Repo Check
- Verify current folder is a Git repo: `git status` and confirm `.git` exists.
- Show remotes to ensure correct origin: `git remote -v`.
- Identify active branch: `git branch --show-current`.

## Prepare Local Changes
- If there are local modifications, either commit them or stash: `git add -A && git commit -m "WIP"` or `git stash -u`.
- Ensure pulls use rebase to keep history clean: `git config pull.rebase true` (repo-local).

## Fetch and Pull
- Update refs: `git fetch --all --prune`.
- Pull the latest for the current branch with rebase: `git pull --rebase`.
- If upstream has diverged, fast-forward or rebase as needed; resolve any conflicts and continue: `git rebase --continue`.

## Submodules (If Present)
- If `.gitmodules` exists, update submodules: `git submodule update --init --recursive`.

## Verify Update
- Show recent commits to confirm new changes landed: `git log -n 5 --oneline --graph --decorate`.
- Optionally run project checks (e.g., `npm install` and tests) if dependencies changed.

## Fallback: Not a Git Repo Here
- If this folder is not a Git repo, either:
  - Clone into the current folder: `git clone <repo-url> .` (empty folder required), or
  - Initialize and set remote: `git init && git remote add origin <repo-url>` then `git fetch` and `git checkout <default-branch>`.

## Next Steps
- I will execute the steps above in this workspace, handle conflicts if they arise, and provide a concise summary of what was updated, including branch, remote, and the latest commit IDs.