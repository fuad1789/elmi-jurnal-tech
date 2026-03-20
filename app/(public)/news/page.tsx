export const dynamic = 'force-dynamic';
import { getNews } from "@/app/actions/news";
import { NewsListView } from "./NewsListView";

export default async function NewsPage() {
  const news = await getNews();
  return <NewsListView news={news} />;
}
