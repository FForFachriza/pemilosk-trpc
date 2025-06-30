import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
	getUsers: adminProcedure.query(async ({ ctx }) => {
		const user = await ctx.db.user.findMany({
			orderBy: {
				nis: "asc",
			},
			include: {
				votingChance: {
					include: {
						periode: true,
					},
				},
			},
		});

		return user ?? null;
	}),
});
