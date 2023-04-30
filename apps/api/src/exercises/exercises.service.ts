import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private api: HttpService) {}

  create(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercise';
  }

  findAll() {
    return this.api.get('/').pipe(map((res) => res.data));
  }

  findAllBodyParts() {
    return this.api.get('/bodyPartList').pipe(map((res) => res.data));
  }

  findExercisesByBodyPart(part: string) {
    return this.api.get(`/bodyPart/${part}`).pipe(map((res) => res.data));
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
