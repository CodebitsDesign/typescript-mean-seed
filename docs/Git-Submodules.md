# Git Submodules - keep a Git repository as a subdirectory of another Git repository

<https://git-scm.com/book/en/v2/Git-Tools-Submodules>
 
  `Submodules` allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another repository into your project and keep your commits separate.

# Starting with Submodules

Let's start by adding an existing Git repository as a submodule of the repository that we're working on.

```bash
$ git submodule add https://github.com/chaconinc/DbConnector  DbConnector
$ git status
$ git diff --cached DbConnector

// If you want a little nicer diff output, 
$ git diff --cached --submodule

// When you commit,
$ git commit -am 'added DbConnector module'

// Lastly, push these changes:
$ git push origin master
```

submodules will add the subproject into a directory named the same as the repository.

> Issue with adding common code as git submodule: “already exists in the index”
> ```bash
> // to unstage all of those files:
> $ git rm -r --cached <subproject-folder>
> // and then add the submodule with:
> git submodule add <url_to_repo> <subproject-folder>
> ```


# Cloning a Project with Submodules

clone a project with a submodule in it. When you clone such a project, by default you get the directories that contain submodules, but none of the files within them yet:

```bash
$ git clone https://github.com/chaconinc/MainProject
```

The DbConnector directory is there, but empty. You must run two commands: git submodule init to initialize your local configuration file, and git submodule update to fetch all the data from that project and check out the appropriate commit listed in your superproject:

```bash
$ git submodule init
$ git submodule update
```

If you pass `--recursive` to the `git clone` command, it will automatically initialize and update each submodule in the repository.

```bash
$ git clone --recursive https://github.com/chaconinc/MainProject
```

# Working on a Project with Submodules

## Pulling in Upstream Changes

If you want to check for new work in a submodule, you can go into the directory and run `git fetch` and `git merge` the upstream branch to update the local code.

```bash
$ git fetch
$ git merge origin/master
```

Now if you go back into the main project and run `git diff --submodule` you can see that the submodule was updated and get a list of commits that were added to it.

If you run `git submodule update --remote`, Git will go into your submodules and fetch and update for you.

```bash
$ git submodule update --remote DbConnector
$ git status
```

Git will by default try to update `all` of your submodules when you run `git submodule update --remote` so if you have a lot of them, you may want to pass the name of just the submodule you want to try to update.

## Working on a Submodule

let's go through an example of making changes to the submodule at the same time as the main project and committing and publishing those changes at the same time.

let's go into our submodule directory and check out a branch.

```bash
$ git checkout stable
   Switched to branch 'stable'
```

Here we'll see that there was a change on the server for this submodule and it gets merged in.

```bash
$ git submodule update --remote --merge
```

## Publishing Submodule Changes

ask Git to check that all your submodules have been pushed properly before pushing the main project. The `git push` command takes the `--recurse-submodules` argument which can be set to either `“check”` or `“on-demand”`.

```bash
$ git push --recurse-submodules=on-demand
```

> go into each submodule and push to the remotes to make sure they're externally available and then try this push again for you.

## Merging Submodule Changes

```bash
$ git pull
$ git diff
diff --cc DbConnector
index eb41d76,c771610..0000000
```

> So, in this case, `eb41d76` is the commit in our submodule that we had and `c771610` is the commit that upstream had.

You can either just try the merge with the SHA-1 directly, or you can create a branch for it and then try to merge that in. We would suggest the latter, even if only to make a nicer merge commit message.

So, we will go into our submodule directory, create a branch based on that second SHA-1 from `git diff` and manually merge.

```bash
$ cd DbConnector


$ git rev-parse HEAD
eb41d764bccf88be77aced643c13a7fa86714135


$ git branch try-merge c771610
(DbConnector) $ git merge try-merge
  Automatic merge failed; fix conflicts and then commit the result.
```

We got an actual merge conflict here, so if we resolve that and commit it, then we can simply update the main project with the result.

```bash
$ vim src/main.c     (1)
$ git add src/main.c
$ git commit -am 'merged our changes'

$ cd ..              (2)
$ git diff           (3)

- Subproject commit eb41d764bccf88be77aced643c13a7fa86714135
 -Subproject commit c77161012afbbe1f58b5053316ead08f4b7e6d1d
++Subproject commit 9fd905e5d7f45a0d4cbc43d1ee550f16a30e825a

$ git add DbConnector                  (4)
$ git commit -m "Merge Tom's Changes"  (5)
```
> (1) First we resolve the conflict
> (2) Then we go back to the main project directory
> (3) We can check the SHA-1s again
> (4) Resolve the conflicted submodule entry (5) Commit our merge

-----------------------------------------------------------------

# Submodule Tips

There are a few things you can do to make working with submodules a little easier.

## Submodule Foreach

There is a `foreach` submodule command to run some arbitrary command in each submodule.

```bash
// stash all the work in all our submodules:
$ git submodule foreach 'git stash'

// create a new branch and switch to it in all our submodules:
$ git submodule foreach 'git checkout -b featureA'

//  produce a nice unified diff of what is changed in your main project and all your subprojects as well:
$ git diff; git submodule foreach 'git diff'
```

## Useful Aliases

```bash
$ git config alias.sdiff '!'"git diff && git submodule foreach 'git diff'"
$ git config alias.spush 'push --recurse-submodules=on-demand'
$ git config alias.supdate 'submodule update --remote --merge'
```

> This way you can simply run `git supdate` when you want to update your submodules, or `git spush` to push with submodule dependency checking.

Assume that you have files in a subdirectory of your project, and you want to switch it to a submodule. If you delete the subdirectory and then run `submodule add`, Git yells at you:

```bash
$ rm -Rf CryptoLibrary/
$ git submodule add https://github.com/chaconinc/CryptoLibrary
'CryptoLibrary' already exists in the index
```

> You have to unstage the `CryptoLibrary` directory first. Then you can add the submodule:

```bash
$ git rm -r CryptoLibrary
$ git submodule add https://github.com/chaconinc/CryptoLibrary
```

Now suppose you did that in a branch. If you try to switch back to a branch where those files are still in the actual tree rather than a submodule – you get this error:

```bash
$ git checkout master
error: The following untracked working tree files would be overwritten by checkout:
  CryptoLibrary/Makefile
  CryptoLibrary/includes/crypto.h
  ...
Please move or remove them before you can switch branches.
Aborting
```

You can force it to switch with `checkout -f`, but be careful that you don't have the unsaved changes in there as they could be overwritten with that command.

```bash
$ git checkout -f master
warning: unable to rmdir CryptoLibrary: Directory not empty
Switched to branch 'master'
```

> Then, when you switch back, you get an empty `CryptoLibrary` directory for some reason and `git submodule update` may not fix it either. You may need to go into your `submodule` directory and run a `git checkout .` to get all your files back. You could run this in a `submodule foreach` script to run it for multiple submodules.
