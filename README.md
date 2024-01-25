# immoscout-tracking-extension 

This is an extension for getting a local copy of the immo advertisement. 

## Background
One of the prominent challenges faced on Immobilienscout is encountered after applying for an advertisement and securing a viewing appointment. Subsequently, the publisher has the capability to deactivate the ad, rendering users unable to access any pictures or data thereafter. This extension serves as a solution by caching the ad for your convenience, allowing you to retain access even after deactivation. Simply incorporate the extension to benefit from this functionality.

## Installation 
This project was created using `bun init` in bun v1.0.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

1. Install dependencies 

```bash
bun install
```

2. Get a build to ./public folder 

```bash
bun run build 
```

3. Install the extension.

Go to extensions page from Chrome. 
```
chrome://extensions/
```

And drop public folder to the browser. If developer mode is already enabled, you will be able to import the extension. For more detail, https://developer.chrome.com/docs/extensions/how-to/distribute/install-extensions 


### UI 

![1-LocalList](https://github.com/tarikyayla/immoscout-tracking-extension/assets/29834197/0f867e85-762a-44d5-88f4-25c5ba614450)

![2-Details](https://github.com/tarikyayla/immoscout-tracking-extension/assets/29834197/5eb0a06e-5f87-4cc0-867f-edf0244bbf12)



Disclaimer: This project is intended solely for educational purposes. The author assumes no responsibility for any consequences arising from the use of this extension. Users are advised to use the tool responsibly and in compliance with applicable laws and terms of service.













