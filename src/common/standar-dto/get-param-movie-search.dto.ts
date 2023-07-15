import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetParamMovieSearchDto {
  @IsOptional()
  @ApiPropertyOptional({ default: '%%' })
  readonly query?: string = '%%';
  @IsOptional()
  @ApiPropertyOptional({ default: 'en' })
  readonly language?: string = 'en';
}
