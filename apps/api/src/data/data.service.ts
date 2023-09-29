import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

export class SendJson {
  id: number;
  idNode: number;
  fio: string;
  level: string;
  exp: number;
  money: number;
}

@Injectable()
export class DataService {
  data = readFileSync('testdata.json');
  jsonData = JSON.parse(this.data.toString());
  resources = this.jsonData.map((item) => JSON.parse(item.resources));

  filteredResources = this.resources.map((arrs) =>
    arrs.filter(
      (x) => x.resource === 'ACTIVERATE' || x.resource === 'PASSIVERATE',
    ),
  );

  filteredMoney = this.resources.map((arrs) =>
    arrs.filter((x) => x.resource === 'MONEY'),
  );

  private filteredReduce(filteredArr) {
    return filteredArr.map((arrs) =>
      arrs.reduce((acc, item) => (acc += item.value), 0),
    );
  }

  experience = this.filteredReduce(this.filteredResources);
  money = this.filteredReduce(this.filteredMoney);

  private sendData() {
    const jsonArr = [];
    for (let i = 0; i < this.jsonData.length; i++) {
      const newJson = new SendJson();
      newJson.id = i + 1;
      newJson.idNode = this.jsonData.map((item) => item.idNode)[i];
      newJson.fio = this.jsonData.map((item) => item.fio)[i];
      newJson.level = this.jsonData.map((item) => item.level)[i];
      newJson.exp = this.experience[i];
      newJson.money = this.money[i];

      jsonArr.push(newJson);
    }

    return JSON.stringify(jsonArr);
  }

  async getAll() {
    return this.sendData();
  }
}
