import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { ReplaceCartRequestDto, SavedCartItemDto } from '@shared/cart-contracts';
import type { CheckoutRequestDto, CheckoutResponseDto } from '@shared/checkout-contracts';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';
import type { AuthenticatedRequest } from '../../auth/types/authenticated-request';
import { CartPersistenceService } from '../services/cart-persistence.service';
import { CheckoutService } from '../services/checkout.service';

@Controller('cart')
@UseGuards(JwtAccessGuard)
export class CartController {
  constructor(
    private readonly cartPersistenceService: CartPersistenceService,
    private readonly checkoutService: CheckoutService,
  ) {}

  @Get()
  async getCart(@Req() req: AuthenticatedRequest): Promise<SavedCartItemDto[]> {
    return this.cartPersistenceService.findAllForUser(req.user.userId);
  }

  @Put()
  async replaceCart(
    @Req() req: AuthenticatedRequest,
    @Body() body: ReplaceCartRequestDto,
  ): Promise<void> {
    if (!body || !Array.isArray(body.items)) {
      throw new BadRequestException('Body must include items array');
    }
    await this.cartPersistenceService.replaceForUser(req.user.userId, body);
  }

  @Post('checkout')
  async checkout(
    @Req() req: AuthenticatedRequest,
    @Body() body: CheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
    return this.checkoutService.checkout(req.user.userId, body);
  }
}
