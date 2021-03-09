import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutDTO {
  @ApiProperty()
  readonly text: string;
}
