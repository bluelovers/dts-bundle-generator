import { OutputInputData } from './generate-output';

export function findTripleSlashReferences(sourceText: string | Buffer) {
	return sourceText.toString()
		.match(/(?<=^\/\/\/\s*<reference\s+types=")(.+)(?="\s*\/>)/gm);
}

export function appendToCollectionResult(collectionResult: Pick<OutputInputData, 'typesReferences'>, list: readonly string[] | null) {
	(list as string[])?.forEach(name => {
		collectionResult.typesReferences.add(name);
	});
}
