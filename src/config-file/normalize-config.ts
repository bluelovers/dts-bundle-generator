import { CompilationOptions, EntryPointConfig } from '../bundle-generator';
import { BundlerConfig } from './load-config-file';

export function normalizeEntryPointConfig<T extends EntryPointConfig>(entry: T)
{
	entry.libraries ??= {};
	if (!entry.libraries.allowedTypesLibraries?.length)
	{
		entry.libraries.allowedTypesLibraries = void 0
	}

	entry.output ??= {};
	entry.output.inlineDeclareGlobals = Boolean(entry.output.inlineDeclareGlobals ?? true);
	entry.output.noBanner ??= true;
	entry.output.preserveTripleSlashReferences ??= true;

	return entry
}

export function normalizeCompilationOptions<T extends CompilationOptions>(compilationOptions?: T)
{
	compilationOptions ??= {} as T;
	compilationOptions.followSymlinks ??= false;

	return compilationOptions
}

export function normalizeBundlerConfig<T extends BundlerConfig>(bundlerConfig: T): T
{
	bundlerConfig.entries = bundlerConfig.entries?.map(entry => normalizeEntryPointConfig(entry));
	bundlerConfig.compilationOptions = normalizeCompilationOptions(bundlerConfig.compilationOptions);

	return bundlerConfig
}
