describe('MongoDB Connections', () => {
  test('Should fail when env not test ', () => {
    expect(process.env.NODE_ENV).toEqual('test');
  });
});
