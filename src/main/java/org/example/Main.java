package org.example;


import java.util.regex.*;
import org.apache.commons.lang3.tuple.Pair;
public class Main {
    public static void main(String[] args) {
        String request = "lire Hôtel California";
        Pair<String, String> result = extractActionObject(request);
        System.out.println(result);
    }
    public static Pair<String, String> extractActionObject(String request){
        String action = null;
        String object = null;
        String [] regexTab = {"joue", "jouer", "lire", "écouter"};
        for (String regex : regexTab) {
            Pattern pattern = Pattern.compile(regex + "\\s+(.*)", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(request);
            if(matcher.find()) {
                action = "play";
                object = matcher.group(1);
                break;
            }
        }

        return Pair.of(action, object);
    }
}