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
| Datasource | blob or string   | Yes      | Will contain the file path. The provided datasource can be of type blob and will hold the content of the file, or simply a url.                                                                 |
| File Name  | string | Yes      | Will contain the file name with the extension. Once downloaded, the resulting file will be fully named by that string. If no name is specified, then the downloaded file will have a random label without the extension.                                               |
| Server ref | string | No       | Will contain the button's reference in case the user wants to perform some server-side actions on this latter By doing so, you enable the utilization of this reference in class functions, thereby governing the component's actions. |
