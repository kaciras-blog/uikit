function readPackage(packageJson) {
	const { dependencies, peerDependencies } = packageJson;

	// storybook 带了 react 类型（实际上并不需要）跟 Volar 冲突。
	delete dependencies["@types/react"];
	delete peerDependencies["@types/react"];

	return packageJson;
}

module.exports = { hooks: { readPackage } };
