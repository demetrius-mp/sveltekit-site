import recipientRepository, {
	type Recipient,
	type RecipientRepository
} from '$lib/repositories/RecipientRepository';
import { writable, type Writable } from 'svelte/store';

interface RecipientStore extends Writable<Recipient[]> {
	findOne: RecipientRepository['findOne'];
}

function createRecipientStore(): RecipientStore {
	const { set, subscribe, update } = writable<Recipient[]>([]);

	return {
		set,
		subscribe,
		update,
		async findOne(username) {
			return recipientRepository.findOne(username);
		}
	};
}

const recipientStore = createRecipientStore();

export default recipientStore;
