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
export class TopDataService {
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
    const buffer = [];
    const jsonArr = [];
    for (let i = 0; i < this.jsonData.length; i++) {
      const newJson = new SendJson();
      newJson.idNode = this.jsonData.map((item) => item.idNode)[i];
      newJson.fio = this.jsonData.map((item) => item.fio)[i];
      newJson.level = this.jsonData.map((item) => item.level)[i];
      newJson.exp = this.experience[i];
      newJson.money = this.money[i];

      buffer.push(newJson);
    }

    buffer.sort((a, b) => (a.exp + a.money > b.exp + b.money ? -1 : 1));

    let counter = 1;
    for (let i = 0; i < buffer.length; i++) {
      const newJson = new SendJson();

      const exp = buffer.map((item) => item.exp)[i];
      const money = buffer.map((item) => item.money)[i];

      const nextExp = buffer.map((item) => item.exp)[i + 1];
      const nextMoney = buffer.map((item) => item.money)[i + 1];

      newJson.id = counter;
      newJson.idNode = buffer.map((item) => item.idNode)[i];
      newJson.fio = buffer.map((item) => item.fio)[i];
      newJson.level = buffer.map((item) => item.level)[i];
      newJson.exp = exp;
      newJson.money = money;

      if (exp + money !== nextExp + nextMoney) {
        counter += 1;
      }

      jsonArr.push(newJson);
    }

    return JSON.stringify(jsonArr);
  }

  async getTop() {
    return this.sendData();
  }
}
