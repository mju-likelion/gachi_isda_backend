import { Router } from "express";
import request from "request";
import { getModeForFileReference } from "typescript";

const router = Router();
router.get("/searchTrain", async (req, res) => {
  var url =
    "http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo";
  var queryParams =
    "?" +
    encodeURIComponent("serviceKey") +
    "=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D"; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("10"); /* */
  queryParams +=
    "&" + encodeURIComponent("_type") + "=" + encodeURIComponent("json"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("depPlaceId") +
    "=" +
    encodeURIComponent("NAT010000"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("arrPlaceId") +
    "=" +
    encodeURIComponent("NAT011668"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("depPlandTime") +
    "=" +
    encodeURIComponent("20220804"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("trainGradeCode") +
    "=" +
    encodeURIComponent("00"); /* */
  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      console.log("Status", response.statusCode);
      console.log("Headers", JSON.stringify(response.headers));
      console.log("Reponse received", body);
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

const cityId = [
  "11",
  "12",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
];

router.get("/stations", async (req, res) => {
  let i = 0;
  const arr = [];
  for (i in cityId) {
    var url =
      "http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList";
    var queryParams =
      "?" +
      encodeURIComponent("serviceKey") +
      "=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D"; /* Service Key*/
    queryParams +=
      "&" +
      encodeURIComponent("numOfRows") +
      "=" +
      encodeURIComponent("50"); /* */
    queryParams +=
      "&" +
      encodeURIComponent("_type") +
      "=" +
      encodeURIComponent("json"); /*type */
    queryParams +=
      "&" +
      encodeURIComponent("cityCode") +
      "=" +
      encodeURIComponent(cityId[i]); /* */

    request(
      {
        url: url + queryParams,
        method: "GET",
      },
      await function (error, response, body) {
        console.log("Status", response.statusCode);
        //console.log("Headers", JSON.stringify(response.headers));
        //console.log("Reponse received", body);
        let info = JSON.parse(body);
        let i = 0;
        let j = 0;
        for (i in info["response"]["body"]["items"]["item"]) {
          //let station_id = info["response"]["body"]["items"]["item"][i].nodeid;
          let station_name =
            info["response"]["body"]["items"]["item"][i].nodename;
          console.log(station_name);
        }
      }
    );
  }

  //res.json();
});

export default router;
