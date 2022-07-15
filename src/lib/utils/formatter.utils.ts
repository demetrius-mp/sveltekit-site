const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	year: '2-digit'
});

const relativeDateFormatter = new Intl.RelativeTimeFormat('pt-BR', {
	numeric: 'auto'
});

function getFormattedRelativeDate(date: Date) {
	const diffInDays = dateDiffInDays(new Date(), date);

	if (diffInDays < -365) {
		const diffInYears = Math.floor(diffInDays / (30 * 365));
		return relativeDateFormatter.format(diffInYears, 'year');
	}

	if (diffInDays < -30) {
		const diffInMonths = Math.floor(diffInDays / 30);
		return relativeDateFormatter.format(diffInMonths, 'month');
	}

	if (diffInDays < -7) {
		const diffInWeeks = Math.floor(diffInDays / 7);
		return relativeDateFormatter.format(diffInWeeks, 'week');
	}

	return relativeDateFormatter.format(diffInDays, 'day');
}

function dateDiffInDays(a: Date, b: Date) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;

	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function formatDate(date: Date) {
	const formattedDate = dateFormatter.format(date);
	const formattedRelativeDate = getFormattedRelativeDate(date);

	return `${formattedDate} (${formattedRelativeDate})`;
}
