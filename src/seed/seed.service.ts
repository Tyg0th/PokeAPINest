import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from "axios";
import { PokeResponse } from './interfaces/poke-respose.interface';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;



  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");

    data.results.forEach(pokemon => {
      console.log(pokemon.name, pokemon.url.split("/").at(-2));

    })

    return data.results;
  }
}
