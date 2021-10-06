const writeToStdout = (str) => {
    process.stdout.write(str);
}

const onReverseString = (data) => {
    const reverseString = data.toString().split('').reverse().join('');
    writeToStdout(reverseString);
}

process.openStdin().addListener('data', onReverseString);
