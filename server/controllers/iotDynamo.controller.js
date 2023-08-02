const { sensorService } = require("../services");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const AWS = require("aws-sdk");
const { timeConverter } = require("../helpers/UnixDateHelper");

const sensorController = {
  async getData(req, res, next) {
    let mac_Id = req.query.mac_Id;
    let ts = parseInt(req.query.ts);

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
          mac_Id: "c8:c9:a3:fa:c8:34",
          ts: ts,
        },
      };

      docClient.get(params, function (err, data) {
        if (err) {
          console.log(
            "sense::fetchOneByKey::error -" + JSON.stringify(err, null, 2)
          );
        }

        let result = [];

        let date = timeConverter(data.Item.ts);
        result = [
          {
            ts: date,
            mac_Id: data.Item.mac_Id,
            data: {
              Light: data.Item.Light,
              Co2_Aeration: data.Item.Co2_Aeration1,
              EC1: data.Item.EC1,
              Air_Presssure: data.Item.Air_Presssure1,
              Soil_Temperature: data.Item.Soil_Temperature1,
              pH: data.Item.pH,
              Soil_Moisture: data.Item.Soil_Moisture1,
              Salinity: data.Item.Salinity1,
              Air_humidity: data.Item.Air_humidity1,
              Air_Temperature: data.Item.Air_Temperature1,
            },
          },
        ];

        res.send(result);
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = sensorController;
