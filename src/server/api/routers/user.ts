import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
	getUsers: adminProcedure
		.input(z.object({ periodeId: z.string().optional() }))
		.query(async ({ ctx, input }) => {
			if (input.periodeId === "all" || input.periodeId === undefined) {
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
			}

			const user = await ctx.db.user.findMany({
				where: {
					votingChance: {
						some: {
							periodeId: input.periodeId,
						},
					},
				},
				orderBy: {
					nis: "asc",
				},
				include: {
					votingChance: {
						where: {
							periodeId: input.periodeId,
						},
						include: {
							periode: true,
						},
					},
				},
			});

			return user ?? null;
		}),
});
