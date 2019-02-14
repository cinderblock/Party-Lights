# Deploy Scripts

Scripts to aide in development or deployment on remote systems.

## Raspberry Pi Setup

Some commands need to be run **once** on the target pi to get the linux system into the state we expect.

```shell
# Add node source
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

# Or for Pi Zero
curl https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-armv6l.tar.xz | unxz | sudo tar -x -C /usr/local/ --exclude CHANGELOG.md --exclude LICENSE --exclude README.md --strip-components 1

# Add yarn source
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Update apt packages
sudo apt update

# Install dependencies
sudo apt install -y yarn build-essential libudev-dev libssl-dev libcurl4-openssl-dev node

# Clone project. Current tools expect the project to be at ~/deploy
git clone git@github.com:cinderblock/Party-Lights.git ~/deploy

# Set `receive.denyCurrentBranch` to `ignore`
git --git-dir ~/deploy/.git config receive.denyCurrentBranch ignore
```

## Cheat sheet

All of these are run from the top level directory.

| Command                        | Description                                                       |
| ------------------------------ | ----------------------------------------------------------------- |
| `yarn deploy setup daemon`     | Run **daemon** on remote with most recent local code              |
| `yarn remote add some-package` | Add `some-package` to the daemon using the remote's yarn          |
| `yarn remote upgrade`          | Upgrade daemon packages to latest version using the remote's yarn |
| `yarn remote kill`             | Kill the daemon on remote                                         |
| `yarn remote shutdown`         | Shutdown the remote system                                        |
| `yarn remote reboot`           | Reboot the remote system                                          |
