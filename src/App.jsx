import * as React from 'react';

import QRCode from 'qrcode';

const username = 'itskinglau';
const note = 'Sunday-Sips';
const qrCodeColors = {
	dark: '#FFFFFF',
	light: '#008CFF',
};

export default function App() {
	const [qrCodeUri, setQrCodeUri] = React.useState('');
	const [paymentAmount, setPaymentAmount] = React.useState('');

	const qrCodeOutput = React.useRef(null);

	React.useEffect(() => {
		if (qrCodeOutput.current) {
			QRCode.toDataURL(
				`https://venmo.com/${username}?txn=pay&amount=${paymentAmount}&note=${note}`,
				{ scale: 6, color: qrCodeColors },
				(err, url) => {
					if (err) console.error(err);
					setQrCodeUri(url);
				},
			);
		}
	}, [paymentAmount]);

	return (
		<div className='container'>
			<img ref={qrCodeOutput} src={qrCodeUri} />

			<h3>
				Venmo <u>@{username}</u>
				<br />${' '}
				<input
					type='text'
					inputMode='decimal'
					placeholder='0'
					value={paymentAmount}
					onChange={event => {
						if (
							testIsValidCurrency(event.target.value) ||
							event.target.value === ''
						) {
							setPaymentAmount(event.target.value);
						}
					}}
				/>
			</h3>
		</div>
	);
}

function testIsValidCurrency(string = '') {
	if (typeof string === 'string' && /^\d+\.?\d{0,2}$/.test(string)) {
		return true;
	}

	return false;
}
