# Overview

The File Download Button is a component designed to facilitate the downloading of files from a web application or website. It serves as a simple and essential tool for enabling users to access any downloadable content accessed from their user interface.

## File download component

![download](https://github.com/b-fadwa/Qodly-file-download/blob/develop/public/download.png)

### Properties

| Name          | Type   | Default       | Description                                                                                                                                           |
| ------------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| label         | string | Download File | This is the label that will be displayed inside the file download button.                                                                             |
| Icon position |        | left          | This property sets the position of the download's button's icon according to the label. The proposed options are: top, bottom, left, right, or hidden |     

### Datasource

| Name       | Type   | Required | Description                                                                                                   |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| Datasource | blob   | Yes      | Will contain the to be downloaded file path                                                                   |
| File Name  | string | Yes      | Will contain the to be downloaded file name with the extension                                                |
| Server ref | string | No       | Will contain the button's reference in case the user wants to perform some server-side actions on this latter |
