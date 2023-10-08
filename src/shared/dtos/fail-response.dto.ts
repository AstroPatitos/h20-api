import { ApiProperty } from '@nestjs/swagger';

export class FailResponseDto {
  @ApiProperty({ type: Boolean })
  success: boolean;
  @ApiProperty({ type: String })
  message: string;
  @ApiProperty({ type: String, nullable: true })
  error_key: string;
}
