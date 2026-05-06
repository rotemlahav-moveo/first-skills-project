import type { Request } from 'express';

// AuthUserPayload is the payload of the authenticated user 
export type AuthUserPayload = {
  userId: string;
};

// AuthenticatedRequest is the request object with the authenticated user payload
// contorller gets the user from the AuthenticatedRequest object
export type AuthenticatedRequest = Request & {
  user: AuthUserPayload;
};
