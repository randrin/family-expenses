import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/models/Family';
import { Repository } from 'typeorm';
import { FamilyCreateDto } from './families.dto';
import { useCatch } from 'src/app/utils/use-catch';
import { capitalizeName } from 'src/app/utils/commons';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private readonly driver: Repository<Family>,
  ) {}

  async createFamily(familyCreateDto: FamilyCreateDto): Promise<Family> {
    const { name, address, country, father, mother } = familyCreateDto;
    const family = new Family();
    family.name = capitalizeName(name);
    family.code = String(Math.floor(Math.random() * 90000) + 10000); // random 5 digit code
    family.address = address;
    family.country = country;
    // family.father = father;
    // fa
    const query = this.driver.save(family);

    const [error, result] = await useCatch(query);
    if (error) throw new NotFoundException(error);

    return result;
  }

  async findOnByName(name: string): Promise<Family> {

    const result = this.driver.findOneBy({ name });

    // const query = this.driver
    //   .createQueryBuilder('family')
    //   .where('family.name  = :name', { name: capitalizeName(name) });
    //   console.log(query);
      
    // const result = await query.getOne();

    return result;
  }
}
