/// <reference types="@fastly/js-compute" />

import {
  Router
} from "@fastly/expressly";


import { env } from "fastly:env";
import { KVStore } from "fastly:kv-store";

allowDynamicBackends(true);

const router = new Router();

router.get('/kvTest',  async (req, res) => {

  const version = env("FASTLY_SERVICE_VERSION");
  console.debug(`Current version ${version}`);

  const KVjsondData = new KVStore('jsondata');

  const entry = await KVjsondData.get('one');

  const JSONasString = await entry.text();

  res.json(JSON.parse(JSONasString));

})


router.listen();