# Running application link

http://dms-frontent-1265089652.us-east-1.elb.amazonaws.com/

# Running the project

## DMS Backend repo. clone, install and setup
**`git clone https://github.com/rahul-ranjan-me/dms-node.git`**

**`yarn install`**

**`yarn start`**

Backend application is all setup and started on port 3001


## DMS Frontend repo. clone, install and setup
**`git clone https://github.com/rahul-ranjan-me/dms.git`**

**`yarn install`**

### Properties update in Frontend repo
- Go to your `{frontend repo}/src/properties.js` for MIME types, document size configuration updates
- Update `REACT_APP_API_BASE_PATH` of `{frontend repo}/.env` file with backend application URL

**`yarn start`**

**`yarn start`**

Ok, that's it! Your application is ready. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# What are covered

- Home page is to demonstrate the file upload progress functionality with some quick UI widgets
- Document page consist of two functionalities
* Upload multiple documents (either by selecting on click of button or drag & drop)
* Once submitted the progress can be seen in the adjoining table with progress indicator
* Once files are uploaded, you can preview or download with respective urls from the grid
* Once files are submitted, you can navigate to other pages, and the progress can be shown in the progress indicator widget on bottom right of the page

# App screenshots

![screenshot](
https://raw.githubusercontent.com/rahul-ranjan-me/dms/master/home.png)

![screenshot](
https://raw.githubusercontent.com/rahul-ranjan-me/dms/master/image.png)



