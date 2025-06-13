-- CreateTable
export async function up(db) {
  await db.run(`
    CREATE TABLE "Task" (
      "id" TEXT PRIMARY KEY,
      "task_title" TEXT NOT NULL,
      "Task_description" TEXT NOT NULL,
      "is_completed" BOOLEAN NOT NULL DEFAULT false,
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(db) {
  await db.run(`DROP TABLE "Task";`);
}
