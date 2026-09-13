'use client';

import { useState } from 'react';

type CopyInstallButtonProps = {
	command: string;
};

export function CopyInstallButton({ command }: CopyInstallButtonProps) {
	const [copied, setCopied] = useState(false);

	async function copyCommand() {
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}

	return (
		<button type="button" onClick={copyCommand} aria-label={`Copy install command: ${command}`}>
			{copied ? 'Copied' : 'Copy command'}
		</button>
	);
}
