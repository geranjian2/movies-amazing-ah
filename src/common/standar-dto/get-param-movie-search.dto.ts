import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetParamMovieSearchDto {
  @IsOptional()
  @ApiPropertyOptional({ default: '%%' })
  readonly q?: string = '%%';
  @IsOptional()
  @ApiPropertyOptional({ default: 'en' })
  readonly language?: string = 'en';
}
