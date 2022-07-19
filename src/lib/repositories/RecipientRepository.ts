import stall from '$lib/utils/stall.utils';
import { faker } from '@faker-js/faker';
import { uniqueId } from 'lodash-es';

export interface Recipient {
	id: string;
	username: string;
}

const recipients: Recipient[] = Array.from({ length: 25 })
	.fill(0)
	.map(() => {
		return {
			id: uniqueId(),
			username: faker.internet.userName()
		};
	});

export interface RecipientRepository {
	findOne(username: string): Promise<Recipient | undefined>;
}

function createRecipientRepository(): RecipientRepository {
	return {
		async findOne(username) {
			await stall(300);
			return recipients.find((u) => u.username === username);
		}
	};
}

const recipientRepository = createRecipientRepository();

export default recipientRepository;
