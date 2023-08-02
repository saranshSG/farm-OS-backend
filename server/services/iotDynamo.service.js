const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const AWS = require("aws-sdk");

const getSensorData = async (res) => {
  let awsconfig = {
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: "AKIA4FG2DOOFXMAMNYPL",
    secretAccessKey: "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",
  };

  AWS.config.update(awsconfig);
  try {
    let docClient = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: "sense",
      Key: {
        mac_Id: "c8:c9:a3:fb:1e:14",
        ts: 1646904215055,
      },
    };

    docClient.get(params, function (err, data) {
      if (err) {
        console.log(
          "sense::fetchOneByKey::error -" + JSON.stringify(err, null, 2)
        );
      }

      let result = [];

      result = [
        {
          ts: data.Item.ts,
          mac_Id: data.Item.mac_Id,
          data: {
            Light: data.Item.Light,
            Co2_Aeration1: data.Item.Co2_Aeration1,
            EC1: data.Item.EC1,
            Air_Presssure1: data.Item.Air_Presssure1,
            Soil_Temperature1: data.Item.Soil_Temperature1,
            pH: data.Item.pH,
            Soil_Moisture1: data.Item.Soil_Moisture1,
            Salinity: data.Item.Salinity1,
            Air_humidity: data.Item.Air_humidity1,
            Air_Temperature: data.Item.Air_Temperature1,
          },
        },
      ];
      console.log(result);
      res.status(httpStatus.FOUND).send(result);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSensorData,
};
