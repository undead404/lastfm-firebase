import { functions, performance } from '../misc/firebase-app';
import { SerializableTag } from '../misc/types';

const callable = functions.httpsCallable('getTag');

export default async function getTag(
  tagName: string,
): Promise<SerializableTag | null> {
  const trace = performance.trace('GET_TAG_REQUEST');
  trace.putAttribute('tagName', tagName);
  trace.start();
  const { tag }: { tag: SerializableTag | null } = (
    await callable({ tagName })
  ).data;
  trace.stop();
  return tag;
}
