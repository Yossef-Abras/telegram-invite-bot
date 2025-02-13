module.exports = async (ctx) => {
  const from = ctx.from;
  await ctx.editMessageText(
    `
    💸 <b>Withdraw Balance: </b>
    Please send the amount you want to withdraw and your contact details.
  `,
    { parse_mode: 'HTML' },
  );
};
