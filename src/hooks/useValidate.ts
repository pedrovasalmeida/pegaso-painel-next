import { validateUser } from './validateUser';
import nookies from 'nookies';

export async function useCan({ ctx }) {
  const cookies = nookies.get(ctx);
  const authId = cookies['pegaso.auth'];

  if (!!!authId) {
    return false;
  }

  const { shouldRedirect, isUserValid } = await validateUser({ authId, ctx });

  if (shouldRedirect || !isUserValid) {
    nookies.destroy(ctx, undefined, 'pegaso.auth');
    return false;
  }

  return true;
}
