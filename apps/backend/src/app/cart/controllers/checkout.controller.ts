import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { CheckoutRequestDto, CheckoutResponseDto } from '@shared/checkout-contracts';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';
import type { AuthenticatedRequest } from '../../auth/types/authenticated-request';
import { CheckoutService } from '../services/checkout.service';

@Controller('cart')
@UseGuards(JwtAccessGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout')
  async checkout(
    @Req() req: AuthenticatedRequest,
    @Body() body: CheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
    return this.checkoutService.checkout(req.user.userId, body);
  }
}
