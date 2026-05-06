import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FavoriteItemDto } from '../../../../../../libs/shared/favorites-contracts/src';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';
import type { AuthenticatedRequest } from '../../auth/types/authenticated-request';
import type { ReplaceFavoritesBody } from '../dto/replace-favorites.dto';
import { FavoritesService } from '../services/favorites.service';

@Controller('favorites')
@UseGuards(JwtAccessGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(@Req() req: AuthenticatedRequest): Promise<FavoriteItemDto[]> {
    return this.favoritesService.findAllForUser(req.user.userId);
  }

  @Put()
  async replaceFavorites(
    @Req() req: AuthenticatedRequest,
    @Body() body: ReplaceFavoritesBody,
  ): Promise<void> {
    if (!body || !Array.isArray(body.productIds)) {
      throw new BadRequestException('Body must include productIds array');
    }
    await this.favoritesService.replaceForUser(req.user.userId, body.productIds);
  }
}
