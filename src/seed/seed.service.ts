import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from "axios";
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");
    const pokemonToInsert: { name: string, no: number }[] = [];
    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      const no = +url.split("/").at(-2);
      pokemonToInsert.push({ no, name });
    });

    this.pokemonModel.insertMany(pokemonToInsert)

    return data.results;
  }
}
