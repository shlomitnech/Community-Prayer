# **Weekly Tefillah Submission Platform**

A serverless application to manage tefillah (prayer) name submissions. This project consists of:

- A **React-based frontend** for user interaction.
- A serverless **backend API** built with AWS SAM, Lambda, and DynamoDB.

Users can submit, update, and delete tefillah name requests seamlessly.

---

## **Features**

### **Frontend**
- Developed using **React**.
- User-friendly interface for managing tefillah name requests.
- Supports the following operations:
  - **Submit**: Add new names for tefillah.
  - **Update**: Modify existing entries.
  - **Delete**: Remove entries.

### **Backend**
- **Serverless Architecture**: Built using AWS Lambda and API Gateway.
- **DynamoDB Integration**: Provides scalable, NoSQL storage for prayer requests.
- **RESTful API**: Easily integrates with any frontend or external service.
- **Robust Error Handling**: Ensures API reliability and data integrity.

---

## **Tech Stack**

### **Frontend**
- **React**
- **React Router**: For navigation.
- **Axios**: For making HTTP requests.

### **Backend**
- **AWS Lambda**: Executes serverless functions.
- **AWS API Gateway**: Manages API requests.
- **AWS DynamoDB**: Stores prayer name entries.
- **Python 3.12**: Programming language for Lambda functions.
- **AWS SAM**: Infrastructure as code framework for deployment.

---

## **Setup and Deployment**

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
2. Install [AWS CLI](https://aws.amazon.com/cli/).
3. Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).
4. Set up AWS credentials:
   ```bash
   aws configure
