import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";

export const periodeRouter = createTRPCRouter({
	getPeriodes: adminProcedure.query(async ({ ctx }) => {
		const periode = await ctx.db.periode.findMany();

		return periode ?? null;
	}),
});
