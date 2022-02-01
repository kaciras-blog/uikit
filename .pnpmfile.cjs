function readPackage(packageJson) {
	const { dependencies, peerDependencies } = packageJson;

	// storybook 带了 react 类型（实际上并不需要）跟 Volar 冲突。
	delete dependencies["@types/react"];
	delete peerDependencies["@types/react"];

	// storybook 把 react（也不需要）作为 peer 依赖，安装时搞出一堆烦人的警告。
	delete peerDependencies["react"];
	delete peerDependencies["react-dom"];

	return packageJson;
}

module.exports = { hooks: { readPackage } };
