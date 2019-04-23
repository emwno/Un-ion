package com.union.data;

import com.backendless.Backendless;
import com.backendless.async.callback.AsyncCallback;
import com.backendless.exceptions.BackendlessFault;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created on Apr 2019.
 */
public class Main {

    public static void main(String[] args) {
        Backendless.initApp("3C12364D-8C22-6E45-FFB7-08B271E5A300","DC76271B-DC64-E2F2-FF25-28CB5DBF1C00");

        List<Article> realList = getRealArticles();
        List<Article> fakeList = getFakeArticles();

        Backendless.Data.of(Article.class).create(realList, new AsyncCallback<List<String>>() {
            @Override
            public void handleResponse(List<String> strings) {
                System.out.println("Real Articles Saved - " + strings.size());
            }

            @Override
            public void handleFault(BackendlessFault backendlessFault) {
                System.out.println("Real Error:" + backendlessFault);
            }
        });

        Backendless.Data.of(Article.class).create(fakeList, new AsyncCallback<List<String>>() {
            @Override
            public void handleResponse(List<String> strings) {
                System.out.println("Fake Saved - " + strings.size());
            }

            @Override
            public void handleFault(BackendlessFault backendlessFault) {
                System.out.println("Fake Error:" + backendlessFault);
            }
        });
    }

    private static void resetArticles() {
        Backendless.Data.of(Article.class).remove("created > 04-04-2000");
    }

    private static List<Article> getRealArticles() {
        JsonNode node = getJson("https://www.reddit.com/r/theonion.json?limit=100");
        List<Article> articleList = new ArrayList<>();

        for (final JsonNode objNode : node) {
            if (objNode.get("data").get("preview") == null) continue;
            Article article = new Article();
            article.setTitle((objNode.get("data").get("title").asText()));
            article.setLink(objNode.get("data").get("url").asText());
            int resSize = objNode.get("data").get("preview").get("images").get(0).get("resolutions").size();

            String thumb = "";
            if (resSize > 0 && resSize > 2) {
                thumb = objNode.get("data").get("preview").get("images").get(0).get("resolutions").get(2).get("url").asText().replace("amp;", "");
            } else {
                thumb = objNode.get("data").get("preview").get("images").get(0).get("source").get("url").asText().replace("amp;", "");
            }
            article.setThumbnail(thumb);
            article.setFakeNews(true);

            articleList.add(article);
        }

        return articleList;
    }

    private static List<Article> getFakeArticles() {
        JsonNode node = getJson("https://www.reddit.com/r/nottheonion.json?limit=100");
        List<Article> articleList = new ArrayList<>();

        for (final JsonNode objNode : node) {
            if (objNode.get("data").get("preview") == null) continue;
            Article article = new Article();
            article.setTitle((objNode.get("data").get("title").asText()));
            article.setLink(objNode.get("data").get("url").asText());
            article.setFakeNews(true);

            String thumb = "";
            int resSize = objNode.get("data").get("preview").get("images").get(0).get("resolutions").size();
            if (resSize > 0 && resSize > 2) {
                thumb = objNode.get("data").get("preview").get("images").get(0).get("resolutions").get(2).get("url").asText().replace("amp;", "");
            } else {
                thumb = objNode.get("data").get("preview").get("images").get(0).get("source").get("url").asText().replace("amp;", "");
            }
            article.setThumbnail(thumb);

            articleList.add(article);
        }

        return articleList;
    }

    private static JsonNode getJson(String urlS) {
        JsonNode node = null;
        try {
            StringBuilder result = new StringBuilder();
            URL url = new URL(urlS);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0");

            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line;
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            rd.close();

            ObjectMapper objectMapper = new ObjectMapper();
            node = objectMapper.readTree(result.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return node.get("data").get("children");
    }

}
