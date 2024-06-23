REPO_TM2_JS_CLIENT=https://github.com/gnolang/tm2-js-client.git
REPO_COSMJS=https://github.com/cosmos/cosmjs.git

NODEPATH=node_modules

FOLDER_REPO_COSMJS=cosmjs
FOLDER_COSMJS=@cosmjs

USER_GNOLANG=@gnolang
FOLDER_REPO_TM2_JS=tm2-js-client
FOLDER_TM2_JS=@gnolang/tm2-js-client

PACKAGES_COSMJS=amino crypto encoding ledger-amino math utils
PACKAGES_TM2_JS=amino

all: clone install copy buildweb clean

# Clones the repositories from where are required the ts files
clone:
	git clone $(REPO_COSMJS) 
	git clone $(REPO_TM2_JS_CLIENT)

# Install dependencies
install:
	yarn install

# Fix ts files missing in warnings
copy:
	for p in $(PACKAGES_COSMJS); do \
	    echo "	Adding $(NODEPATH)/@$(FOLDER_REPO_COSMJS)/$$p"; \
		cp -r $(FOLDER_REPO_COSMJS)/packages/$$p/src $(NODEPATH)/$(FOLDER_COSMJS)/$$p; \
	done

#echo "	Adding $(FOLDER_REPO_TM2_JS)/$(NODEPATH)/$(FOLDER_REPO_COSMJS)/amino/src"
#cp -r $(FOLDER_REPO_COSMJS)/packages/amino/src $(NODEPATH)/${USER_GNOLANG}/$(FOLDER_TM2_JS)/$(NODEPATH)/$(FOLDER_COSMJS)/amino/src

# Build the page
buildweb:
	yarn build

# Remove the folders cloned to get the special files required
clean:
	rm -rf $(FOLDER_REPO_COSMJS)
	rm -rf $(FOLDER_REPO_TM2_JS)